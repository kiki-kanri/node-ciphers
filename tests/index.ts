import { runAESTest } from './aes';
import { runDESTest } from './des';

function main() {
	runAESTest();
	console.log();
	runDESTest();
}

(() => main())();
