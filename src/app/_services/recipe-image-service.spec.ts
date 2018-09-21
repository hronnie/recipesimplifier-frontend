import { TestBed, inject } from '@angular/core/testing';

import { RecipeImageService } from './recipe-image-service';

describe('RecipeImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeImageService]
    });
  });

  it('should be created', inject([RecipeImageService], (service: RecipeImageService) => {
    expect(service).toBeTruthy();
  }));
});
