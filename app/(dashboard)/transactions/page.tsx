import { createClient } from "@/lib/supabase/server";
import CreateTransactionForm from "./CreateTransactionForm";

export default async function TransactionPage() {
    const supabase = await createClient();

    const { data: transactions, error } = await supabase
        .from("transactions")
        .select("*, bank_accounts(name), categories(name)")
        .order("transaction_date", { ascending: false });

    const { data: accounts } = await supabase.from("bank_accounts").select("id, name");
    const { data: categories } = await supabase.from("categories").select("id, name");

    return (
        <div className="p-5 md:p-8">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>

            {error && <p className="text-red-600">Could not load transactions: {error.message}</p>}

            {transactions && transactions.length > 0 ? (
                <ul className="space-y-2 mb-6">
                    {transactions.map((transaction) => (
                        <li
                            key={transaction.id}
                            className="bg-slate-900 text-slate-300 border border-slate-300 rounded-md p-4 flex flex-col items-start justify-center"
                        >
                            <p className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                                {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                            </p>
                            <p>{transaction.bank_accounts?.name}</p>
                            <p className="text-slate-400">{transaction.categories?.name ?? "Uncategorized"}</p>
                            {transaction.description && <p className="text-slate-400">{transaction.description}</p>}
                            <p className="text-slate-400 text-sm">{transaction.transaction_date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p className="mb-6">You don&apos;t have any transactions yet. Add your first transaction below</p>
            )}

            <CreateTransactionForm accounts={accounts ?? []} categories={categories ?? []} />
        </div>
    );
}
