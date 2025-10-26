import { RiErrorWarningFill } from "react-icons/ri";

export default function ScreenError() {
  return (
    <>
      <div className="inner text-center text-white m-0 p-3 m-0">
        <h5>
          The website requires a larger screen. Please access it from a desktop
          or laptop computer.
        </h5>
        <hr />
        <h5 className="mb-3">يتطلب الموقع شاشه اكبر لإستخدامه بشكل أفضل</h5>
        <RiErrorWarningFill />
      </div>
    </>
  );
}
