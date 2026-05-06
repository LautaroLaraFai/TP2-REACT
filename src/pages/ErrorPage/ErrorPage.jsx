import { Link } from "react-router"

export default function ErrorPage () {
    return <div>
        <div className="text-center">
            <h1 className="text-9xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
                Page Not Found
            </h2>
            <Link className="text-2xl hover:underline" to="/">
                Go Back Home
            </Link>
        </div>
    </div>
}