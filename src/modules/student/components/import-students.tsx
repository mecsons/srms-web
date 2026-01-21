import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {useMemo, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Button} from "@/components/ui/button";
import {useNotifyToast} from "@/hooks/use-notify";
import {Upload, FileSpreadsheet, X} from "lucide-react";
import {useImportStudents} from "@/modules/student/lib/hooks/use-student-service.ts";

type Props = {
    gradeId: string;
};

const ACCEPTED = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/vnd.ms-excel": [".xls"],
};

export function ImportStudents({gradeId}: Props) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const {successToast, errorToast} = useNotifyToast();
    const importStudents = useImportStudents(gradeId);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
        open: openFilePicker,
    } = useDropzone({
        accept: ACCEPTED,
        multiple: false,
        noClick: true,
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0] ?? null);
        },
    });

    const rejectionMessage = useMemo(() => {
        if (!fileRejections.length) return null;

        const first = fileRejections[0];
        const err = first.errors[0];

        if (!err) return "Invalid file.";
        if (err.code === "file-invalid-type") return "Only .xlsx or .xls files are allowed.";
        if (err.code === "too-many-files") return "Please upload only one file.";

        return err.message;
    }, [fileRejections]);

    const canSubmit = !!file && !importStudents.isPending;

    const onImport = async () => {
        if (!file) return;

        try {
            await importStudents.mutateAsync(file);
            successToast("Students imported successfully");
            setFile(null);
            setOpen(false);
        } catch (e) {
            errorToast(e);
        }
    };

    const onClose = (nextOpen: boolean) => {
        if (importStudents.isPending) return;

        setOpen(nextOpen);
        if (!nextOpen) {
            setFile(null);
            importStudents.reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Upload/>
                    <span className={"hidden md:inline"}>Import Students</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Import Students</DialogTitle>
                    <DialogDescription>
                        Upload an Excel file (.xlsx/.xls). We'll import and attach students to this grade.
                    </DialogDescription>
                </DialogHeader>

                <div
                    {...getRootProps()}
                    className={[
                        "rounded-lg border border-dashed p-4 transition",
                        isDragActive ? "bg-muted" : "bg-background",
                    ].join(" ")}
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="text-muted-foreground"/>

                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    {isDragActive ? "Drop the file here..." : "Drag & drop the Excel file here"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Or click the button below to choose a file.
                                </p>
                            </div>
                        </div>

                        {file ? (
                            <div className="rounded-md bg-muted p-3">
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} KB
                                </p>
                            </div>
                        ) : null}

                        {rejectionMessage ? (
                            <p className="text-sm text-destructive">{rejectionMessage}</p>
                        ) : null}

                        {importStudents.isError ? (
                            <p className="text-sm text-destructive">
                                Import failed. Please try again.
                            </p>
                        ) : null}

                        <div className="flex justify-center gap-2">
                            <Button size={"sm"} type="button" variant="secondary" onClick={openFilePicker}
                                    disabled={importStudents.isPending}>
                                Choose File
                            </Button>

                            {file && (
                                <Button
                                    size={"sm"}
                                    type="button"
                                    variant="outline"
                                    onClick={() => setFile(null)}
                                    disabled={importStudents.isPending}
                                >
                                    <X/> Remove File
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" disabled={importStudents.isPending}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button type="button" onClick={onImport} disabled={!canSubmit}>
                        {importStudents.isPending ? "Importing..." : "Import Students"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
