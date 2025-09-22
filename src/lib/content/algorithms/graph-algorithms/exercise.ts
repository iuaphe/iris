import { p } from '$lib/components/article/article';
import { Exercise } from '$lib/components/article/exercise';

export const testExercise = new Exercise('test-exercise', [p`This is a test.`.value]);
