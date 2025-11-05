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
		id: "approve-registrations",
		title: "Approve Registrations",
		description:
			"Comprehensive guide to approving entities registered by users within the ORC Admin platform. This sections covers step by step instructions on how to review and approve registrations",
		docs: [
			{
				id: "transactions-timeline",
				title: "Transactions Timeline",
				description:
					"Overview of the transactions timeline feature. This section highlights the key components and functionalities of the transactions timeline.",
				pageImage: null,
			},
			{
				id: "pending-approvals",
				title: "Pending Approvals",
				description:
					"Overview of the pending approvals feature. This section highlights the key components and functionalities that help you monitor and manage pending approvals effectively.",
				pageImage: null,
			},
		],
	},
	{
		id: "approve-changes",
		title: "Approve Changes",
		description:
			"Comprehensive guide to approving changes made to registered entities within the ORC Admin platform. This section talks about how to review and approve changes made by users.",
		docs: [
			{
				id: "pending-approval-changes",
				title: "Pending Approvals",
				description:
					"Step-by-step instructions on how to approve changes in particulars made to the active entities within the ORC Admin platform.",
				pageImage: null,
			},

		],
	},
	{
		id: "approve-renewals",
		title: "Approve Renewals",
		description:
			"Guide to approving renewals for registered entities within the ORC Admin platform. This section of the documentation provides detailed instructions on how to manage and approve renewals to registered entities.",
		docs: [
			{
				id: "approval",
				title: "Approval",
				description:
					"Guide to approving renewals for registered entities within the ORC Admin platform. This section of the documentation provides detailed instructions on how to manage and approve renewals to registered entities.",
				pageImage: null,	
			}

		],
	},
	{
		id: "approve-reprints",
		title: "Approve Reprints",
		description:
			"Comprehensive guide to approving user reprints within the ORC Admin platform. This section encompasses the approval process and best practices for maintaining a secure and efficient environment.",
		docs: [
			{
				id: "approval",
				title: "Approval",
				description:
					"Comprehensive guide to approving user reprints within the ORC Admin platform. This section encompasses the approval process and best practices for maintaining a secure and efficient environment.",
				pageImage: null,	
			}

		],
	},
];
