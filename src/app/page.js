import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
    <div>
    <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end', padding: '0px 25px'}}>
          <Link href={"/login"}>
            <span className={styles.login_btn}>Login</span>{" "}
          </Link>
        </div>
    </div>
      <div className={styles.home_box}>

        <div className={styles.main_text}>
          <h1>Legal Services In Jammu</h1>
          <h2>
            Powerful Advocacy. Proven Results. Your Trusted Partners in Legal
            Success.
          </h2>
        </div>

        <div className={styles.intro_box}>
          <div className={styles.left_box}>
            <h2>Meet Your Lawyer</h2>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, officia iusto maiores exercitationem quidem expedita consectetur nam impedit harum quo pariatur fugit quisquam ex eaque, aperiam itaque numquam eum temporibus!
          Cupiditate doloribus fugit quia praesentium delectus nam aliquam omnis repellendus quaerat, quos, voluptatibus unde corrupti eius illo vitae ipsum. Ducimus corrupti omnis optio quis animi illum amet dolor ea vel!
          Facere minima tenetur, ullam ab accusantium illum velit iste amet dolore, veritatis vitae aliquid! Iste perspiciatis odit obcaecati voluptatum recusandae necessitatibus placeat velit repudiandae, odio tenetur veniam, reprehenderit, dignissimos minima.
          Error magni velit tempore in, enim ex, quis architecto consectetur assumenda neque corporis expedita ullam optio quod aut odit, officia dolor repellat quibusdam laudantium cum? Sint nisi quod numquam saepe.
          Rerum quasi similique necessitatibus voluptatum magni vel adipisci illo expedita, nihil possimus sed maiores. Minima eum omnis corporis inventore! Praesentium ullam vel, necessitatibus ipsa assumenda dignissimos autem nesciunt quaerat modi.
          Sit rem impedit ducimus corrupti, laudantium vero, aperiam cupiditate suscipit doloribus odit, nostrum dicta obcaecati quas reiciendis alias perferendis quaerat eligendi cumque possimus illo vel! Deserunt quod amet facilis quaerat?
          Numquam iste tempore ut. Dignissimos error provident, sunt esse itaque quisquam porro. Blanditiis hic error, natus explicabo nihil quod dignissimos possimus veritatis enim voluptates saepe accusamus laborum non at officia.
          Excepturi expedita sapiente quae quod omnis, pariatur natus magnam inventore corporis ea blanditiis culpa sed optio voluptatum animi iusto neque, ab ipsam aut maiores. Rerum quo nisi necessitatibus amet aspernatur.
          Aspernatur reprehenderit deserunt eius qui distinctio cupiditate voluptatum facere illo velit tempora! Minus est iste dicta voluptates dolorem dolores alias, repellendus facere nesciunt magni optio? Omnis obcaecati nulla tempora sed.
          Temporibus, sapiente laudantium. Ullam illum consequuntur deleniti adipisci itaque quibusdam sapiente vero, aliquid eum nihil, doloremque eveniet ea odio sint. Ipsum pariatur ea eius eum, soluta ut magnam enim placeat.
          Fuga harum libero itaque voluptatem in tempore, sequi soluta exercitationem aperiam, beatae error aliquam blanditiis, pariatur ducimus. Minus, molestiae eligendi? Dolor doloremque voluptatibus unde incidunt quis et alias in dolorum?
          Quod amet quas, animi dolorum qui tenetur soluta rem maiores, laboriosam mollitia fugiat suscipit neque voluptatem illum, repellat sint placeat optio maxime aliquid adipisci ipsa reiciendis. Recusandae itaque nesciunt voluptatibus.
          Ullam quos dolore sed amet commodi blanditiis. Veniam, nisi ad unde eius enim id a. Perspiciatis esse doloremque reprehenderit, sint vel, maiores et laudantium deserunt repellendus voluptatum velit nulla nam.
          Mollitia amet maiores possimus, atque id veniam aspernatur nihil voluptatum, reprehenderit aperiam perspiciatis minus quisquam repellat voluptate fugiat quae? Ea nostrum magni, ullam cum iure odio voluptas debitis aut deserunt.
          Explicabo facere aut quod dolores dolorem error perferendis, quos itaque est aspernatur minima. Nam rem dolorum natus culpa debitis nesciunt libero tempore nihil consequuntur, sunt ullam ipsa deserunt vitae voluptate.</h4>
          </div>
          <div className={styles.profile_image}>

          </div>

        </div>

      </div>
    </>
  );
}
