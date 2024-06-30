import { Button } from "~/packages/components/ui/button";

export default function ButtonPage(){
  return (
    <div className="w-fit flex gap-10">
      <div className="flex flex-col gap-5">
        <h4 className="text-2xl font-bold font-satoshi text-white">Default Buttons</h4>
        <Button>
          Default
        </Button>
        <Button variant="secondary">
          Secondary
        </Button>
        <Button variant="tertiary">
          Tertiary
        </Button>
        <Button variant="ghost">
          Ghost
        </Button>
        <Button variant="link">
          Link
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <h4 className="text-2xl font-bold font-satoshi text-white">Arrow Buttons</h4>
        <Button arrow>
          Default arrow
        </Button>
        <Button arrow variant="secondary">
          Secondary arrow
        </Button>
        <Button arrow variant="tertiary">
          Tertiary arrow
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <h4 className="text-2xl font-bold font-satoshi text-white">Special Buttons</h4>
        <Button special>
          Special
        </Button>
        <Button special variant="secondary">
          Secondary special
        </Button>
        <Button special variant="tertiary">
          Tertiary special
        </Button>
      </div>
    </div>
  )
}