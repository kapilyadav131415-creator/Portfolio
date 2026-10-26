interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border pb-8 pt-8">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted-foreground">/{title.toLowerCase()}</span>
        <span className="rule-grow" />
      </div>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{description}</p>
    </div>
  );
}
