import Image from "next/image"


export default function Review() {
    return(
        <div className="flex items-start space-x-4 mt-5">
            <Image
                src="/avatar.png"
                alt="Reviewer Image"
                className="w-16 h-16 rounded-full border border-gray-300"
                width={100}
                height={100}
            />
            <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                    <h5 className="text-sm font-semibold text-gray-700">Kevin Tomato</h5>
                    <h5 className="text-sm text-green-500">9th July 2022</h5>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                    The tractor delivers exceptional power, handling even the toughest tasks with ease.
                    Whether it’s plowing through heavy soil or transporting loads, the engine runs
                    smoothly without stalling. The gear transitions are seamless, and the hydraulic
                    system is incredibly responsive, making operations feel effortless.
                </p>
            </div>
        </div>
    )
}