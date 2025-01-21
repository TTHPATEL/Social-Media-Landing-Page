const WelcomeMsg = ({ handleOnclickFetchAPI }) => {
  return (
    <center>
      <h1 className="welcomemsg">There is no Post</h1>,
      <button
        type="button"
        className="btn btn-primary fetchbtn"
        onClick={() => handleOnclickFetchAPI()}
      >
        Fetch Post
      </button>
    </center>
  );
};
export default WelcomeMsg;
