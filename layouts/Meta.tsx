import Head from "next/head";
import { FC } from "react";

const Meta: FC<MetaTagsProps> = ({ title, description, keywords, image }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />

            <title>{title || "Spending Tracker"}</title>
            <meta
                name="description"
                content={
                    description || "Track your expenses by connecting your bank accounts and credit cards. Get insights into your spending habits and make informed financial decisions."
                }
            />
            <link rel="manifest" href="/manifest.json" />
            <link
                href="/icons/icon-32px.png"
                rel="icon"
                type="image/png"
                sizes="32x32"
            />
            <link
                href="/icons/icon-64px.png"
                rel="icon"
                type="image/png"
                sizes="64x64"
            />
            <link rel="shortcut icon" href="/icons/icon-32px.png" />
            <link rel="apple-touch-icon" href="/icons/icon-32px.png" />
            <meta name="theme-color" content="#000000" />
            <link rel="icon" href="/icons/icon-32px.png" />

            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta
                property="og:description"
                content={
                    description || "Track your expenses by connecting your bank accounts and credit cards. Get insights into your spending habits and make informed financial decisions."
                }
            />
            <meta property="og:url" content="" />
            <meta property="og:site_name" content="Spending Tracker" />
            <meta
                property="article:publisher"
                content=""
            />
            <meta
                property="modified_time"
                content="2026-08-4T04:36:07+00:00"
            />
        </Head>
    )
}