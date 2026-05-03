const RatingStars = ({ rating, maxStars = 5, starColor = "text-orange-700", size = "text-xl" }) => {

    if (!rating || rating === 0) {
        const emptyStars = "☆".repeat(maxStars)
        return <span className={`${starColor} ${size}`}>{emptyStars}</span>
    }
    
    const validRating = Math.min(rating, maxStars)
    
    const fullStars = "★".repeat(validRating)
    const emptyStars = "☆".repeat(maxStars - validRating)
    
    return <span className={`${starColor} ${size}`}>{fullStars + emptyStars}</span>
}

export default RatingStars