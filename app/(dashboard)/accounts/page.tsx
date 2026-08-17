import { createClient } from "@/lib/supabase/server";
import CreateAccountForm from "./CreateAccountForm";


export default async function AccountsPage() {

    const supabase = await createClient();
    const { data: accounts, error } = await supabase.from("bank_accounts").select("*")

    return (
        <div className="p-5 md:p-8">
            <h1 className="text-2xl font-bold mb-4">Accounts</h1>

            {error &&
                <p className="text-red-600">
                    Could not load accounts: {error.message}
                </p>
            }

            {accounts && accounts.length > 0 ? (
                <ul className="space-y-2 mb-6">
                    {accounts.map((account) => (
                        <li
                            key={account.id}
                            className="border border-slate-300 rounded-md p-3 flex justify-between"
                        >
                            <span>{account.name} <span className="text-slate-400 text-sm">({account.account_type})</span></span>
                            <span>${account.current_balance.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p className="mb-6">You don&apos;t have any accounts yet. Add your first one below</p>
            )}

            <CreateAccountForm />
        </div>
    )
}