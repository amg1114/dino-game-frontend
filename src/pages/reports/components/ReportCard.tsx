import { Report } from "../../../models/report.interface";

interface ReportCardProps {
    report: Report,
    wrapperExtraClasses?: string;
}

export function ReportCard({ report, wrapperExtraClasses }: ReportCardProps) {
    return (
        <article className={`flex h-full flex-col bg-placeholder ${wrapperExtraClasses}`}>
            <section className="flex justify-between">
                <h4 className="text-xl leading-none md:text-2xl">REPORT #{report.id}</h4>
                <div className="flex gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_647_2595)">
                            <path d="M11.25 6.75L6.75 11.25M6.75 6.75L11.25 11.25M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="#3DAB7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_647_2595">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 9L8.25 10.5L11.25 7.5M3.75 2.25H14.25C15.0784 2.25 15.75 2.92157 15.75 3.75V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25Z" stroke="#B95959" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </section>

            <section className="flex gap-2">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 9H7.5M6 7.5V10.5M11.25 9.75H11.2575M13.5 8.25H13.5075M3 4.5H15C15.8284 4.5 16.5 5.17157 16.5 6V12C16.5 12.8284 15.8284 13.5 15 13.5H3C2.17157 13.5 1.5 12.8284 1.5 12V6C1.5 5.17157 2.17157 4.5 3 4.5Z" stroke="#3DAB7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h4 className="text-xl leading-none md:text-2xl">{report.videoGame?.titulo}</h4>
            </section>
            <section className="flex gap-2">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5.25V6.75M9 9.75H9.0075M15.75 11.25C15.75 11.6478 15.592 12.0294 15.3107 12.3107C15.0294 12.592 14.6478 12.75 14.25 12.75H5.25L2.25 15.75V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V11.25Z" stroke="#3DAB7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h4 className="text-xl leading-none md:text-2xl">{report.typeReport?.title}</h4>
            </section>
        </article>
    )
}