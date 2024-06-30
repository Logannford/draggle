export default function TypographyPage(){
  return (
    <div className="flex flex-col gap-y-10 container py-10 text-white">
      <h1 className="text-4xl font-satoshi">
        Typography
      </h1>
      <div className="flex gap-20">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl font-inter font-semibold">
            Inter
          </h2>
          <div className="inter-text-2xl">
            Text 2xl
          </div>
          <div className="inter-text-xl">
            Text xl
          </div>
          <div className="inter-text-lg">
            Text lg
          </div>
          <div className="inter-text-md">
            Text md
          </div>
          <div className="inter-text-sm">
            Text sm
          </div>
          <div className="inter-text-xs">
            Text xs
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-heading-3xl">
            Satoshi
          </h2>
          <div className="text-heading-2xl">
            Heading 2xl
          </div>
          <div className="text-heading-xl">
            Heading xl
          </div>
          <div className="text-heading-lg">
            Heading lg
          </div>
          <div className="text-headng-md">
            Heading md
          </div>
          <div className="text-heading-sm">
            Heading sm
          </div>
          <div className="text-heading-xs">
            Heading xs
          </div>
        </div>
      </div>
    </div>
  )
}