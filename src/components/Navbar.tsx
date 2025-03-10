"use client";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            <div>
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;

