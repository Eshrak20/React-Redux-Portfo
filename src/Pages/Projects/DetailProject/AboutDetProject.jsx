import RichContent from "@/components/RichContent/RichContent.jsx";
import SocialShareButtons from "@/Pages/Blogs/DetBlogs/SocialShareButtons";
import {
  getProjectCategory,
  getStatusClasses,
  getTechArray,
} from "@/utils/projectUtils";
import {
  Activity,
  CalendarDays,
  Code2,
  Database,
  ExternalLink,
  Github,
  Layers,
  Layers3,
  Layout,
  Server,
} from "lucide-react";
import ProjectAuthorPanel from "./ProjectAuthorPanel";
import ProjectHeroMedia from "./ProjectHeroMedia";

const ProjectAboutCard = ({ project, about, socialLinks }) => (
  <div className="rounded-sm border border-border bg-card p-5 sm:p-6">
    <ProjectAuthorPanel
      staff={project.staff}
      about={about}
      socialLinks={socialLinks}
    />
  </div>
);

const AboutDetProject = ({ project, about, socialLinks = [] }) => {
  if (!project) return null;

  const overview = project.description || project.long_description;
  const projectFacts = [
    { label: "Status", value: project.status, icon: Activity },
    { label: "Type", value: project.project_type, icon: Layout },
    { label: "Category", value: getProjectCategory(project), icon: Layers },
    { label: "Year", value: project.year, icon: CalendarDays },
  ].filter(({ value }) => Boolean(value));
  const technologyGroups = [
    { label: "Frontend", value: project.frontend_tech, icon: Code2 },
    { label: "Backend", value: project.backend_tech, icon: Server },
    { label: "Database", value: project.database_tech, icon: Database },
    { label: "Tools", value: project.tools, icon: Layers3 },
  ]
    .map((group) => ({ ...group, technologies: getTechArray(group.value) }))
    .filter(({ technologies }) => technologies.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-6 sm:pt-10 lg:px-8 lg:pt-18">
      <header className="overflow-hidden rounded-sm border border-border bg-card">
        <ProjectHeroMedia project={project} />
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12 lg:p-10">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {project.status && (
                <span
                  className={`border px-2.5 py-1 text-xs font-semibold capitalize ${getStatusClasses(project.status)}`}
                >
                  {project.status}
                </span>
              )}
              <span className="border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                {getProjectCategory(project)}
              </span>
            </div>

            <h1 className="break-words text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {project.project_name}
            </h1>

            {project.short_description && (
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {project.short_description}
              </p>
            )}

            {(project.live_url || project.github_url) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <ExternalLink aria-hidden="true" size={16} />
                    Visit live project
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <Github aria-hidden="true" size={16} />
                    Source code
                  </a>
                )}
              </div>
            )}
          </div>

          {projectFacts.length > 0 && (
            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {projectFacts.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="min-w-0 rounded-sm border border-border bg-background p-3 sm:p-4"
                >
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <Icon
                      aria-hidden="true"
                      size={15}
                      className="shrink-0 text-primary"
                    />
                    {label}
                  </dt>
                  <dd className="mt-2 break-words text-sm font-semibold capitalize text-foreground sm:text-base">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-[3.5rem_minmax(0,1fr)_16rem] lg:justify-center lg:gap-6 xl:grid-cols-[3.5rem_minmax(0,48rem)_16rem] xl:gap-18">
        <aside
          aria-label="Share this project"
          className="hidden min-w-0 lg:col-start-1 lg:row-start-1 lg:block"
        >
          <div className="sticky top-24 flex flex-col items-center gap-3 rounded-sm border border-border bg-card p-2">
            <span className="mb-1 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground [writing-mode:vertical-rl]">
              Share
            </span>
            <SocialShareButtons
              title={project.project_name}
              summary={project.short_description || overview || ""}
              contentType="project"
              vertical
            />
          </div>
        </aside>

        <article className="min-w-0 lg:col-start-2 lg:row-start-1">
          {overview && (
            <section aria-labelledby="project-overview-title">
              <h2
                id="project-overview-title"
                className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Project overview
              </h2>
              <RichContent
                content={overview}
                className="text-[15px] sm:text-base"
              />
            </section>
          )}

          {technologyGroups.length > 0 && (
            <section className="mt-10 border-t border-border pt-8 sm:mt-12 sm:pt-10">
              <h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Technology
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {technologyGroups.map(
                  ({ label, icon: Icon, technologies }) => (
                    <div
                      key={label}
                      className="rounded-sm border border-border bg-card p-4"
                    >
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Icon
                          aria-hidden="true"
                          size={16}
                          className="text-primary"
                        />
                        {label}
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                          <li
                            key={technology}
                            className="max-w-full break-words rounded-sm border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>
            </section>
          )}
        </article>

        <aside className="min-w-0 lg:col-start-3 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <ProjectAboutCard
              project={project}
              about={about}
              socialLinks={socialLinks}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AboutDetProject;
