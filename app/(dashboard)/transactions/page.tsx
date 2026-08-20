import { createClient } from "@/lib/supabase/server";
import CreateTransactionForm from "./CreateTransactionForm";
import TransactionRow from "./TransactionRow";
import { transactionTypes } from "@/interfaces/type";

export default async function TransactionPage() {
    const supabase = await createClient();

    const { data: transactions, error } = await supabase
        .from("transactions")
        .select("*, bank_accounts(name), categories(name)")
        .order("transaction_date", { ascending: false });

    const { data: accounts } = await supabase.from("bank_accounts").select("id, name");
    const { data: categories } = await supabase.from("categories").select("id, name");

    const types = ["income", "expense"] as transactionTypes

    return (
        <div className="p-5 md:p-8">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>

            {error && <p className="text-red-600">Could not load transactions: {error.message}</p>}

            {transactions && transactions.length > 0 ? (
                <ul className="space-y-2 mb-6">
                    {transactions.map((transaction) => (
                        <TransactionRow
                            key={transaction.id}
                            account={transaction.bank_account_id}
                            accountId={transaction.id}
                            accountsDropdown={accounts ?? []}
                            categories={transaction.category_id}
                            categoriesDropdown={categories ?? []}
                            transactionAmount={transaction.amount}
                            transactionDate={transaction.transaction_date}
                            transactionDescription={transaction.description}
                            transactionTypeDropdown={types}
                            type={transaction.type}
                        />
                    ))}
                </ul>
            ) : (
                !error && <p className="mb-6">You don&apos;t have any transactions yet. Add your first transaction below</p>
            )}

            <CreateTransactionForm accounts={accounts ?? []} categories={categories ?? []} />
        </div>
    );
}
