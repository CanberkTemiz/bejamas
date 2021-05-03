import React from 'react';

const Pagination = ({response, handleGetData}) => {
    return (
        <div className="pagination">
            {response.hasPrevPage && (
            <button style={{color: "black"}} onClick={() => handleGetData(response.prevPage)}>
                {"<"}
            </button>
            )}
            
            {new Array(response.totalPages).fill("").map((page, index) => (
            <button 
                key={index} 
                className={index+1 === response?.page ? "isActivePage" : ""} 
                onClick={() => handleGetData(index+1)}
            >{index + 1 }
            </button>
            ))}

            {response.hasNextPage && (
            <button style={{color: "black"}} onClick={() => handleGetData(response.nextPage)}>
                {">"}
            </button>
            )}
        </div>
    )
}

export default Pagination;