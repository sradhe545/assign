
  function createArrayOfSize(n) {
    return new Array(n).fill(0);
  }


  function Pagination({page,totalPages,handlePageChange}) {
    let pages = createArrayOfSize(totalPages).map((a,index) =>
    {
      return( <button disabled={page===index+1} onClick={()=>handlePageChange(index+1)}>{index+1}</button>
       )
    }
    );
    return (
        <>
        <button disabled={page===1} onClick={()=>handlePageChange(page-1)}>PREV</button>
        {pages}
        <button disabled={page===totalPages} onClick={()=>handlePageChange(page+1)}>NEXT</button>
        </>
       )
  }


  
  export default Pagination;