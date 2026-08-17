import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function formatMoney(amount: number) {
    const formatted = Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${amount < 0 ? "-" : ""}$${formatted}`;
}

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: accounts } = await supabase.from("bank_accounts").select("current_balance");

    const hasAccounts = accounts !== null && accounts.length > 0;
    const totalBalance = accounts?.reduce((sum, account) => sum + account.current_balance, 0) ?? 0;

    return (
        <div className="p-5 md:p-8">
            <h1 className="text-2xl font-bold">
                Hello, Adam!
            </h1>
            <div className="p-4 mx-auto flex flex-col justify-around items-center bg-blue-950">
                {hasAccounts ? (
                    <div>
                        <p className="text-slate-300">Total Balance</p>
                        <h2 className="text-white text-xl font-semibold">{formatMoney(totalBalance)}</h2>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-slate-300 mb-2">You don&apos;t have any accounts yet.</p>
                        <Link href="/accounts" className="text-green-400 underline">
                            Add your first account
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center">
                <p className="font-semibold">Recent transactions</p>
                <button className="border-transparent rounded-md px-3 py-1.5 font-slate-300 hover:bg-green-700 hover:text-white hover:border-green-700">
                    + Add
                </button>
            </div>
            <div className="p-2 ">

            </div>
        </div>
    )
}
