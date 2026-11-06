export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1 -skew-x-[17deg]" aria-hidden="true">
        <span className="block h-[29px] w-[7px] bg-ink" />
        <span className="block h-[29px] w-[7px] bg-brand" />
        <span className="block h-[29px] w-[7px] bg-lime-dark" />
      </div>
      <div>
        <strong className="block text-[13px] font-extrabold tracking-[1.5px]">CAMPUSCODE</strong>
        <small className="mono-label mt-[3px] block !text-[7px] !tracking-[1px]">HACKATHON ARENA</small>
      </div>
    </div>
  )
}
