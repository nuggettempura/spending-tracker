import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function formatMoney(amount: number) {
    const formatted = Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${amount < 0 ? "-" : ""}$${formatted}`;
}

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: accounts } = await supabase.from("bank_accounts").select("current_balance");
    const { data: recentTransactions } = await supabase
        .from("transactions")
        .select("*, bank_accounts(name), categories(name)")
        .order("transaction_date", { ascending: false })
        .limit(5);

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
                <Link
                    href="/transactions"
                    className="border-transparent rounded-md px-3 py-1.5 font-slate-300 hover:bg-green-700 hover:text-white hover:border-green-700"
                >
                    + Add
                </Link>
            </div>
            <div className="p-2">
                {recentTransactions && recentTransactions.length > 0 ? (
                    <ul className="space-y-2">
                        {recentTransactions.map((transaction) => (
                            <li
                                key={transaction.id}
                                className="border border-slate-300 rounded-md p-3 flex justify-between items-center"
                            >
                                <div>
                                    <p>{transaction.bank_accounts?.name}</p>
                                    <p className="text-slate-400 text-sm">{transaction.categories?.name ?? "Uncategorized"}</p>
                                </div>
                                <p className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                                    {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-400">No transactions yet.</p>
                )}
            </div>
        </div>
    )
}
