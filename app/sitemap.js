/** Staging: returns no URLs. Full sitemap implementation preserved below in a block comment. */
export default async function sitemap() {
  return [];
}

/*
import { fetchApiData } from './lib/api';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pay10.in';
  const sanitizeDate = (value) => {
    const parsed = new Date(value || Date.now());
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  // Static routes
  const routes = [
    '',
    '/about-us',
    '/contact-us',
    '/blog',
    '/news',
    '/events',
    '/products',
    // '/privacy-policy',
    '/terms-of-services',
    '/vision-mission',
    '/corporate-information',
    '/customer-grievances-policy',
    '/coming-soon',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const collectPaginatedItems = async ({
    endpointBuilder,
    listingKey,
    logLabel,
  }) => {
    const collected = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      do {
        const data = await fetchApiData(endpointBuilder(currentPage));
        if (!data?.status) break;

        const items = Array.isArray(data?.[listingKey]) ? data[listingKey] : [];
        collected.push(...items);

        totalPages = Number(data?.pagination?.total_pages) || currentPage;
        currentPage += 1;
      } while (currentPage <= totalPages);
    } catch (error) {
      console.error(`Error fetching ${logLabel} for sitemap:`, error);
    }

    return collected;
  };

  const collectPaginatedItemsWithFallback = async ({
    endpointBuilders,
    listingKey,
    logLabel,
  }) => {
    for (const buildEndpoint of endpointBuilders) {
      const firstPage = await fetchApiData(buildEndpoint(1));
      if (firstPage?.status) {
        const remaining = await collectPaginatedItems({
          endpointBuilder: buildEndpoint,
          listingKey,
          logLabel,
        });
        return remaining;
      }
    }

    return [];
  };

  // Fetch all paginated blog routes
  const allBlogs = await collectPaginatedItems({
    endpointBuilder: (page) => `/blog?page=${page}`,
    listingKey: 'post_listing',
    logLabel: 'blogs',
  });

  const blogRoutes = allBlogs
    .filter((post) => post?.slug)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: sanitizeDate(post.updated_at || post.post_date),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

  // Fetch all paginated event routes
  const allEvents = await collectPaginatedItemsWithFallback({
    endpointBuilders: [
      (page) => `/event?page=${page}`,
      (page) => `/events?page=${page}`,
    ],
    listingKey: 'event_listing',
    logLabel: 'events',
  });

  const eventRoutes = allEvents
    .filter((event) => event?.slug)
    .map((event) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: sanitizeDate(event.updated_at || event.event_end_date || event.event_start_date),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

  return [...routes, ...blogRoutes, ...eventRoutes];
}
*/
