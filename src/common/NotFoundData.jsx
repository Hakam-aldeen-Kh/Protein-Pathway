const NotFoundData = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src="/images/icons/search-status.svg" />
      <div className="mt-[20px] text-center">
        <h3 className="text-[20px] font-bold">No Pathways Found!</h3>
        <p className="mt-2 text-[16px]">
          You did not add any pathways yet, would you like to start adding now?
        </p>
      </div>
    </div>
  );
};

export default NotFoundData;
