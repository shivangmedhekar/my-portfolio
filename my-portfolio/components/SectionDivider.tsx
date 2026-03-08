export default function SectionDivider() {
  return (
    <div className="relative py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent flex items-center justify-center">
          <div className="absolute w-8 h-8 bg-background rounded-full border border-accent/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
