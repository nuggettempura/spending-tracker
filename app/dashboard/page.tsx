
function formatMoney(amount: number, isNegative: boolean) {
    const formatted = Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${isNegative ? "-" : "+"} $${formatted}`;
}

export default function DashboardPage() {
    return (
        <div className="p-5 md:p-8">
            <h1 className="text-2xl font-bold">
                {/* TODO 1: a heading - something like "Good afternoon, Adam!" */}
                Hello, Adam!
            </h1>
            {/* TODO 2: a placeholder "balance card" block 
                    - doesn't need real data, just static text like "$0.00" for now
                    - this is just to confirm the AppShell's content area, padding, and scroll behavior all work correctly before writing any real data in

                */}
            <div className="p-4 mx-auto flex flex-col justify-around items-center bg-blue-950">
                <div
                    key={mockBalancedata.title}
                >
                    <p className="text-slate-300">{mockBalancedata.title}</p>
                    <h2 className="text-white text-xl font-semibold">{formatMoney(mockBalancedata.balance, mockBalancedata.balance < 0)}</h2>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-green-500">{formatMoney(mockBalancedata.in, mockBalancedata.in < 0)}</p>
                        <p className="text-sm text-red-500">{formatMoney(mockBalancedata.out, mockBalancedata.out < 0)}</p>
                    </div>
                </div>
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