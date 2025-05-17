export default function AdminNavbar() {
    return (
        <>
            <div className="p-6 min-h-screen bg-[#6C070E]" style={{ width: "15rem" }}>
                {/* company image */}
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src="/images/CompanyLogo.png"
                        alt="choco"
                        style={{ width: "8rem", height: "8rem" }}
                    />
                </div>

                <nav className="mt-10 space-y-2">
                    <button
                        className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
                        onClick={() => (window.location.href = "/admin")}
                    >
                        <img
                            src="/images/dashboardiconblack.png"
                            alt="Dashboard"
                            className="h-6 w-6"
                        />
                        <span className="font-semibold text-[#FF7E00]">Dashboard</span>
                    </button>
                    <button
                        className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
                        onClick={() => (window.location.href = "/addproduct")}
                    >
                        <img
                            src="/images/Addimage.png"
                            alt="Addimage"
                            className="h-6 w-6"
                        />
                        <span className="font-semibold text-[#FF7E00]">Add Product</span>
                    </button>
                    <button
                        className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
                        onClick={() => (window.location.href = "/myproducts")}
                    >
                        <img
                            src="/images/Addimage.png"
                            alt="My Products"
                            className="h-6 w-6"
                        />
                        <span className="font-semibold text-[#FF7E00]">MY Products</span>
                    </button>
                    <button
                        className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
                        onClick={() => (window.location.href = "/adminOrder")}
                    >
                        <img
                            src="/images/shoppingBag.png"
                            alt="ShoppingBag"
                            className="h-6 w-6"
                        />
                        <span className="font-semibold text-[#FF7E00]">My Order</span>
                    </button>
                </nav>
            </div>
        </>
    )
}