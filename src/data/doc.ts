export type Doc = {
	id: string;
	title: string;
	description: string;
	pageImage: {
		url: string;
		alt: string;
	} | null;
};

export type DocGroup = Omit<Doc, "pageImage"> & { docs: Doc[] };

export function getDocGroups(): DocGroup[] {
	return docs;
}

export async function getDoc(
	slug: string,
): Promise<(Doc & { docGroup: DocGroup; next: Doc | null }) | null> {
	let docGroup = docs.find(({ docs }) => docs.some(({ id }) => id === slug));

	if (!docGroup) {
		return null;
	}

	let index = docGroup.docs.findIndex(({ id }) => id === slug);

	return {
		...docGroup.docs[index],
		docGroup,
		next: index < docGroup.docs.length - 1 ? docGroup.docs[index + 1] : null,
	};
}

export async function getDocumentationContent(slug: string) {
	return (await import(`@/data/docs/${slug}.mdx`)).default;
}

export const docs: DocGroup[] = [
	{
		id: "welcome",
		title: "Welcome",
		description:
			"Introduction to the ORC Admin Web & Mobile Guide. This section provides an overview of the documentation structure and how to navigate through the various topics covered in the guide.",
		docs: [
			{
				id: "getting-started",
				title: "Getting Started",
				description:
					"Begin your journey with the ORC Admin platform. This section covers the initial steps to set up your account, navigate the interface, and understand the core features available to you.",
				pageImage: {
					url: `/welcome.png`,
					alt: "Log in screen of ORC Admin Web Application",
				},
			},
			{
				id: "sign-in",
				title: "Signing In",
				description:
					"Instructions for accessing your account securely. Learn about our authentication process and how to recover your account if needed.",
				pageImage: null,
			},
			{
				id: "dashboard",
				title: "Dashboard",
				description:
					"Overview of the main dashboard features. This section highlights the key components and functionalities that help you monitor and manage your activities effectively.",
				pageImage: null,
			},
		],
	},
	{
		id: "administration-management",
		title: "Administration managment",
		description:
			"Learn how to do administration settings like users mangement, roles management, fees managment etc",
		docs: [
			{
				id: "manage-users",
				title: "User Management",
				description: "Learn how to manage users in the system.",
				pageImage: null,
			},
			{
				id: "manage-officers",
				title: "Officer Management",
				description: "Learn how to manage officers in the system.",
				pageImage: null,
			},
			{
				id: "manage-roles",
				title: "Role Management",
				description: "Learn how to manage roles in the system.",
				pageImage: null,
			},
			{
				id: "manage-fees",
				title: "Fee Management",
				description: "Learn how to manage fees in the system.",
				pageImage: null,
			},
			{
				id: "manage-operation-settings",
				title: "Operation Settings Management",
				description: "Learn how to manage operation settings in the system.",
				pageImage: null,
			},
			{
				id: "view-reports",
				title: "Reports & Analytics",
				description: "Learn how to view reports and analytics in the system.",
				pageImage: null,
			}
		],
	},
];

