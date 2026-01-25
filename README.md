Design a modern web app dashboard page for a school system: route "/_protected/academics/assessments/{assessmentId}".
Style: React + TypeScript + shadcn/ui aesthetic, TailwindCSS, clean white background, subtle borders, rounded-xl cards, soft shadows, modern typography, plenty of spacing. Desktop layout 1440px wide.

Page layout:
- page title "Midterm Exams", a status badge "ONGOING", and action buttons on the right: Edit, Export, More (kebab).
- Under header: two tabs using shadcn tabs component: "Overview" (active) and "Results".

OVERVIEW TAB CONTENT:
- Row of 4 summary cards:
    1) Academic Year: "2025"
    2) Dates: "Jan 15, 2026 → Jan 29, 2026"
    3) Scope: "3 grades • 11 subjects"
    4) Results Coverage: "412 / 520 students entered"
- A large card titled "Scope" containing grouped sections per grade:
    - Grade 1 card row with grade label "Grade 1" and subject chips: Mathematics, English, Science, Civics.
    - Grade 2 row with chips: Mathematics, English, ICT, Geography.
    - Grade 3 row with chips: Mathematics, English, Science, History, Kiswahili.
      Each grade row has a small "View results" ghost button on the right.
- A smaller right-side card titled "Details" showing:
    - Created by: avatar + "Ringo Ebenezer"
    - Created at: "Jan 10, 2026 09:22"
    - Status explanation text
- Use consistent spacing, dividers, and muted gray text for secondary metadata.

RESULTS TAB (show as second tab inactive preview OR separate frame if possible):
- Results toolbar with filters: Grade dropdown (Grade 2 selected), Subject dropdown (All subjects), Search field (placeholder "Search student..."), filter chips "Missing scores" and "Below pass mark".
- Right side buttons: Import Excel, Download Template, Export.
- KPI row: Students 180, Subjects 4, Scores Entered 520/720, Class Average 63.4
- Large data table:
  Columns: Student, Admission No., Mathematics, English, ICT, Geography, Average, Status.
  Show ~8 rows with realistic dummy names and scores, some empty cells to indicate missing scores.
  Score cells look editable (on hover pencil icon).
- A sticky bottom bar appears indicating "Unsaved changes" with buttons Save changes and Discard.

Make it look like a real product UI mockup. No lorem ipsum. Use realistic labels and values. High fidelity.
