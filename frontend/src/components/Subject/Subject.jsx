import DeleteIcon from "../../assets/Delete.png";

function Subject({
    title,
    faculty,
    present,
    absent,
    totalClasses,
    percentage,
    markPresent,
    markAbsent,
    facultyImage,
    handleDelete,
}) {
    return (
        <div className="border border-gray-300 m-2.5 rounded-lg shadow-md bg-gray-700 w-[220px] h-[250px] flex flex-col items-center p-4 text-white overflow-hidden relative">
            <button
                onClick={handleDelete}
                className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs z-10"
            >
                <img src={DeleteIcon} alt="Delete" className="w-4 h-5" />
            </button>
            <div className="flex flex-col items-center w-full h-full justify-between mt-2">
                <h2 className="text-3xl font-bold text-center">{title}</h2>
                <p className="text-2xl text-center">{faculty}</p>
                <hr className="w-[90%] border-t border-gray-400 mt-2 mb-1" />
                <div className="text-base flex items-center justify-center w-full gap-5">
                    <span>Present: {present}</span>
                    <span>Absent: {absent}</span>
                </div>
                <div>
                    <span>Total: {totalClasses}</span>
                </div>

                <div className="w-full my-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                            className={`h-2 rounded-full ${
                                percentage >= 75 ? "bg-green-500" : "bg-red-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <div className="text-xs flex justify-center items-center">
                        {percentage.toFixed(2)}%
                    </div>
                </div>
                <div className="flex gap-5 my-1">
                    <button
                        onClick={markPresent}
                        className="px-2 py-1 bg-green-500 text-white items-center rounded hover:bg-green-600 transition text-xs flex justify-center h-10 w-20"
                    >
                        Present
                    </button>
                    <button
                        onClick={markAbsent}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs flex justify-center h-10 w-20 items-center"
                    >
                        Absent
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Subject;
