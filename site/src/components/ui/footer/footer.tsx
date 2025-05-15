import Logo from "@/components/logo";

export default function Footer() {
    return (
        <footer className="px-4 py-8 border-t border-t-border flex flex-col lg:grid lg:grid-cols-2 bg-primary dark:bg-black">
            <Logo />
        </footer>
    );
}
