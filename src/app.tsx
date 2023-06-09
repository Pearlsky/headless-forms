import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";

const people = [
  { id: 1, name: "React", unavailable: false },
  { id: 2, name: "Vue", unavailable: false },
  { id: 3, name: "Angular", unavailable: false },
  { id: 4, name: "Svelte", unavailable: true },
  { id: 5, name: "Astro", unavailable: false },
];

const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { select: "User Roles" },
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <form
      className="grid place-content-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        render={({ field }) => (
          <div className="w-40">
            <Listbox defaultValue={field.value} onChange={field.onChange}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border sm:text-sm">
                  {({ value }) => (
                    <>
                      <span className="block">
                        {value || "Select an option"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </>
                  )}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base border sm:text-sm">
                    {people.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none mx-1 py-2 px-2 rounded-md ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={person.name}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 right-1.5 flex items-center pl-3 text-amber-900">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        )}
        name="select"
        control={control}
      />
      <button>submit</button>
    </form>
  );
};

export default App;
