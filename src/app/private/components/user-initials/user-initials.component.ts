import { Component, computed, model } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';

type size = 'md' | 'lg';

@Component({
  selector: 'todo-user-initials',
  templateUrl: './user-initials.component.html',
  styleUrl: './user-initials.component.scss',
  standalone: true,
  imports: [MatMiniFabButton, NgClass]
})
export class UserInitialsComponent {
  initials = model.required<string>();
  hasHover = model(true);
  size = model<size>('lg');

  evaluateHover = computed(() => {
    if (!this.hasHover()) {
      return 'has__not__hover';
    }

    return '';
  });

  evaluateSize = computed(() => {
    const size = this.size();

    if (size == 'lg') {
      return 'size__lg';
    }

    if (size == 'md') {
      return 'size__md';
    }

    return '';
  });
}
