import Link from "next/link";

export function Button({title,href} : {
    title : string
    href  : string
}) {
    return (
        <Link href={href}>
            <button className="px-4 py-2 bg-white text-black rounded-lg hover:underline underline-offset-3"
            >
            {title}
            </button>
        </Link>
    )
}