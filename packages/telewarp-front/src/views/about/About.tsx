import styles from "./About.module.css";
import { languages } from "bbpl";

function App() {
  return (
    <div className={styles.page}>
      <h1>About TeleWarp</h1>
      <p>TeleWarp is a sharing platform for projects made in:</p>
      <ul>
        {Object.entries(languages).map((l) => (
          <li key={l[0]}>
            <a href={l[1].url}>{l[1].name}</a>
          </li>
        ))}
      </ul>
      <h2>This is an experiment</h2>
      <p>TeleWarp is in an alpha stage of development.</p>
      <p>
        We may delete all projects at any given moment during this phase of
        development. While we try to run database migrations, sometimes it's not
        possible to do so. Please back up your projects.
      </p>
      <h2>Licensing</h2>
      <p>
        The code for TeleWarp is free software under the{" "}
        <a
          href="https://www.gnu.org/licenses/agpl-3.0.en.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          GNU Affero General Public License v3.0
        </a>{" "}
        or any later version at your desire. It can be downloaded at{" "}
        <a
          href="https://github.com/OmniBlocks/telewarp-duo"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/OmniBlocks/telewarp-duo
        </a>
      </p>
      <p>
        Projects uploaded to TeleWarp are under a CC-BY-SA 4.0 license. (Fine
        print: You can waive the licence to make your project similar to a
        "public domain" program, but we don't recommend doing so.)
      </p>
      <p>
        <strong>
          We won't give you any money if TeleWarp starts to fall apart, unless
          we are legally obligated to do so. Please see section 15, 16, and 17
          of the GNU Affero General Public License v3.0 for more information.
          <br />
          We are not lawyers, but if you have a DMCA (counter-)takedown request
          email ampelectrecuted@gmail.com.
        </strong>
      </p>
    </div>
  );
}

export default App;
