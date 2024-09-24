import Link from "next/link";
import CategoryLinks from "./category-links";
import { Mail, Linkedin, Github } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";

export default async function Footer() {

    return (
        <footer className="bg-primary text-white px-6 py-4 grid">
            <Accordion type="single" collapsible>
                <AccordionItem className="border-accent" value="item-1">
                    <AccordionTrigger className="text-lg">Shop Highlights</AccordionTrigger>
                    <AccordionContent className="text-accent text-base">
                        <CategoryLinks wrapperClassName="flex flex-col" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem className="border-accent" value="item-2">
                    <AccordionTrigger className="text-lg">Quick links</AccordionTrigger>
                    <AccordionContent className="text-accent text-base">
                        <div className="flex flex-col">
                            <Link href='/'>Home</Link>
                            <Link href='/shop'>Shop</Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem className="border-accent" value="item-3">
                    <AccordionTrigger className="text-lg">Resources</AccordionTrigger>
                    <AccordionContent className="text-accent text-base">
                        <div className="flex flex-col">
                            <Link href='https://unsplash.com'>Unsplash</Link>
                            <Link href='https://fakestoreapi.com'>Fake Store API</Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <p className="text-accent text-center mt-10 mb-2">Developed by <strong>Ferangelo Tuason</strong>.</p>
            <div className="flex justify-center gap-3">
                <Link href='/'><Mail size={20} strokeWidth={1} /></Link>
                <Link href='/'><Linkedin size={20} strokeWidth={1} /></Link>
                <Link href='/'><Github size={20} strokeWidth={1} /></Link>
            </div>
        </footer>
    )
}