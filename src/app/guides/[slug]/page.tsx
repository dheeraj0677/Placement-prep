import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPrepGuideBySlug, PREP_GUIDES } from '@/lib/guidesData';
import { getEcePrepGuideBySlug, ECE_PREP_GUIDES } from '@/lib/eceGuidesData';
import GuideDetailClient from './GuideDetailClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getPrepGuideBySlug(params.slug) || getEcePrepGuideBySlug(params.slug);
  if (!guide) {
    return {
      title: 'Guide Not Found — PlacementPrep Radar',
    };
  }

  return {
    title: `${guide.title} — Placement Preparation Guide & Must-Solve Questions`,
    description: `${guide.shortDescription} Includes ${guide.problems.length} curated problems, key concepts, and interview tips.`,
    keywords: [
      guide.title,
      guide.tag,
      'placement prep',
      'interview questions',
      'hardware roadmap',
      'DSA roadmap',
      'LeetCode problems',
      ...guide.testedCompanies,
    ],
  };
}

export async function generateStaticParams() {
  const allGuides = [...PREP_GUIDES, ...ECE_PREP_GUIDES];
  return allGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default function GuideDetailPage({ params }: Props) {
  const guide = getPrepGuideBySlug(params.slug) || getEcePrepGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  return <GuideDetailClient guide={guide} />;
}
