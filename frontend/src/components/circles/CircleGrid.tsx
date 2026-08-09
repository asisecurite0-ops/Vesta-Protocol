'use client';

import React from 'react';
import CircleCard from './CircleCard';

interface Circle {
  id: number;
  name: string;
  contribution: string;
  members: number;
  maxMembers: number;
  frequency: string;
  description: string;
}

interface CircleGridProps {
  circles: Circle[];
  onJoinCircle: (id: number) => void;
}

export default function CircleGrid({ circles, onJoinCircle }: CircleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {circles.map(circle => (
        <CircleCard
          key={circle.id}
          circle={circle}
          onJoin={() => onJoinCircle(circle.id)}
        />
      ))}
    </div>
  );
}