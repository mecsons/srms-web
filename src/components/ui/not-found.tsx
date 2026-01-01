interface Props {
  message?: string
}

export default function NotFound({message = "Not found"}: Props) {
  return (
    <div className="h-100 flex flex-col justify-center items-center space-y-4">
      <img
        src={"/assets/empty.svg"}
        alt="Not found illustration"
        className="w-40 h-40 opacity-80"
      />
      <div className="text-zinc-foreground">
        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  )
}