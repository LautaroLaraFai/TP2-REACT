const SpanInfo = ({ label, textColor, data }) => {
    return <>
        <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5">{label}</span>
        <span className={`lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5 ${textColor}`}>{data}</span>
    </>
}

export default SpanInfo