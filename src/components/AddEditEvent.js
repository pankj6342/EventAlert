import React, { useEffect, useState } from "react";
import { useEvent } from "../customHooks/useEvent";

export const AddEditEvent = ({ children, details, update, host }) => {
  const isHost = host || false;
  const toUpdate = update || false;
  const [data, setData] = useState(details || {});
  useEffect(() => {
    // console.log(details);
    // setData(details);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const { updateEvent, createEvent, updateSucess, addSucess } =
    useEvent(details);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    if (toUpdate) {
      updateEvent(details.id, data);
      if (updateSucess) setShowModal(false);
    } else {
      createEvent(data);
      if (addSucess) setShowModal(false);
    }
  };
  return !showModal ? (
    <div onClick={() => setShowModal(true)}>{children}</div>
  ) : (
    <div className="fixed inset-0 bg-[#1a237e]">
      <div className="overflow-y-auto overflow-x-hidden flex mx-auto z-50 justify-center items-center md:h-full md:inset-0">
        <div className="relative px-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  ></path>
                </svg>
              </button>
            </div>
            <form
              className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
              onSubmit={onSubmit}
            >
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Fill Event Details
              </h3>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Title"
                  required
                  value={data.title}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Description"
                  required
                  value={data.description}
                  onChange={onChange}
                  maxLength={500}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Title"
                  required
                  value={data.date}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Type Of Event
                </label>
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  defaultValue="Choose"
                  onChange={(e) => {
                    console.log({ target: e.target.value });
                    // setData({ ...data, type: e.target.value });
                  }}
                >
                  <option defaultValue={true} value="choose one type">
                    Choose Type
                  </option>
                  <option value="webinar">webinar</option>
                  <option value="seminar">seminar</option>
                  <option value="hackathon">hackathon</option>
                  <option value="research workshop">research workshop</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Place
                </label>
                <input
                  type="text"
                  name="place"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Place of Event"
                  required
                  value={data.place}
                  onChange={onChange}
                />
              </div>
              <input
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                value="Save"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
