import {
	Breadcrumb,
	BreadcrumbHome,
	Breadcrumbs,
	BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { ContentLink } from "@/components/content-link";

import { PageSection } from "@/components/page-section";
import { SidebarLayoutContent } from "@/components/sidebar-layout";
import { getDocGroups } from "@/data/doc";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ORC Web Admin & Mobile Guide",
	description: "Documentation and guides for ORC Admin web and mobile development",
};

export default async function Page() {
	let docGroups = await getDocGroups();
	let docs = docGroups.flatMap(({ docs }) => docs);

	return (
		<SidebarLayoutContent
			breadcrumbs={
				<Breadcrumbs>
					<BreadcrumbHome />
					<BreadcrumbSeparator />
					<Breadcrumb>Welcome</Breadcrumb>
				</Breadcrumbs>
			}
		>
			<div className="relative mx-auto max-w-7xl">
				<div className="absolute -inset-x-2 top-0 -z-10 h-[80dvh] overflow-hidden rounded-t-2xl sm:h-88 md:h-112 lg:-inset-x-4 lg:h-128">
					<iframe
						title="ORC ADMIN WEB APPLICATION"
						src={process.env.APP_URL!}
						className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
					/>
					<div className="absolute inset-0 rounded-t-2xl outline-1 -outline-offset-1 outline-gray-950/10" />
				</div>
				<div className="mx-auto max-w-6xl">
					<div className="relative">
						<div className="absolute top-140 grid grid-cols-1 gap-y-16 pb-10 sm:px-4">
							{docGroups.map((group, index) => (
								<PageSection
									key={group.id}
									id={group.id}
									title={`Part ${index + 1}`}
								>
									<div className="max-w-2xl">
										<h2 className="text-2xl/7 font-medium tracking-tight text-pretty text-gray-950 dark:text-white">
											{group.title}
										</h2>
										<p className="mt-4 text-base/7 text-gray-700 sm:text-sm/7 dark:text-gray-400">
											{group.description}
										</p>

										<ol className="mt-6 space-y-4">
											{group.docs.map((doc) => (
												<li key={doc.id}>
													<ContentLink
														title={doc.title}
														description={doc.description}
														href={`/${doc.id}`}
														type="article"
													/>
												</li>
											))}
										</ol>
									</div>
								</PageSection>
							))}
						</div>
					</div>
				</div>
			</div>
		</SidebarLayoutContent>
	);
}
