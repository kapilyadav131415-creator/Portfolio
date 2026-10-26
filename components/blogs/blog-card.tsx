import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { BlogMeta } from "@/lib/blogs";

interface BlogCardProps {
  blog: BlogMeta;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isoDate = new Date(blog.date).toISOString();

  return (
    <Link href={`/blogs/${blog.slug}`} className="panel group flex flex-col h-full">
      <article className="flex flex-col h-full">
        {blog.coverImage && (
          <div className="relative w-full h-[170px] flex-shrink-0 overflow-hidden bg-muted border-b border-border">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-5 flex flex-col flex-grow gap-3">
          <div className="flex flex-wrap gap-1.5" aria-label="Tags">
            {blog.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="mono-tag">{tag}</span>
            ))}
            {blog.tags.length > 3 && (
              <span className="mono-tag">+{blog.tags.length - 3}</span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-foreground leading-snug line-clamp-2 font-heading">
            {blog.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-3 flex-grow leading-relaxed">
            {blog.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-border mt-auto font-mono text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <time dateTime={isoDate} className="flex items-center gap-1">
                <Icons.calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </time>
              {blog.readingTime && (
                <span className="flex items-center gap-1">
                  <Icons.clock className="w-3.5 h-3.5" />
                  {blog.readingTime} min
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-0.5 text-primary">
              Read
              <Icons.chevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
