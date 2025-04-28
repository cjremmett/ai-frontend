
import './ChatInputBox.css';

export default function ChatInputBox({ handleSubmit, userInputButtonIsDisabled }) {
    return (
    <>
      <form className="ChatInputForm" onSubmit={ handleSubmit }>
        <input type="text" name="userInput"></input>
        <button type="submit" disabled={ userInputButtonIsDisabled }>Send</button>
      </form>
    </>
  );
}
