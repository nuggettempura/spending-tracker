import { createClient } from "@/lib/supabase/server";
import CreateAccountForm from "./CreateAccountForm";
import AccountRow from "./AccountRow";

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
                        <AccountRow
                            key={account.id}
                            accountId={account.id}
                            name={account.name}
                            accountType={account.account_type}
                            currentBalance={account.current_balance}
                        />
                    ))}
                </ul>
            ) : (
                !error && <p className="mb-6">You don&apos;t have any accounts yet. Add your first one below</p>
            )}

            <CreateAccountForm />
        </div>
    )
}
