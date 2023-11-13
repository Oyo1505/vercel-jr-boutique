import { Metadata } from 'next';
import { URL_POLITIQUE_DE_CONFIDENRIALITE } from 'shared/constants/route';
import styles from './page.module.scss';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité | JR Distribution',
    verification: {
      google: 'google'
    },
    metadataBase: new URL(process.env.DOMAIN_URL || ''),
    alternates: {
      canonical: URL_POLITIQUE_DE_CONFIDENRIALITE
    }
  };
}

export default async function Page() {
  return (
    <section className={styles.container}>
      <h1>Politique de confidentialité de JR Distribution</h1>

      <p>
        La présente Politique de confidentialité décrit la façon dont vos informations personnelles
        sont recueillies, utilisées et partagées lorsque vous vous rendez sur
        <a href="https://www.jr-boutique.fr/">https://www.jr-boutique.fr/</a> (le « Site ») ou que
        vous y effectuez un achat.
      </p>

      <h2>INFORMATIONS PERSONNELLES RECUEILLIES</h2>

      <p>
        Lorsque vous vous rendez sur le Site, nous recueillons automatiquement certaines
        informations concernant votre appareil, notamment des informations sur votre navigateur web,
        votre adresse IP, votre fuseau horaire et certains des cookies qui sont installés sur votre
        appareil. En outre, lorsque vous parcourez le Site, nous recueillons des informations sur
        les pages web ou produits individuels que vous consultez, les sites web ou les termes de
        recherche qui vous ont permis d&apos;arriver sur le Site, ainsi que des informations sur la
        manière dont vous interagissez avec le Site. Nous désignons ces informations collectées
        automatiquement sous l&apos;appellation « Informations sur l&apos;appareil ».
      </p>

      <p>
        Nous recueillons les Informations sur l&apos;appareil à l&apos;aide des technologies
        suivantes :
      </p>

      <h3>FICHIERS TÉMOINS (COOKIES)</h3>

      <p>
        Voici une liste de fichiers témoins que nous utilisons. Nous les avons énumérés ici pour que
        vous ayez la possibilité de choisir si vous souhaitez les autoriser ou non.
      </p>

      <ul>
        <li>
          _session_id, identificateur unique de session, permet à Shopify de stocker les
          informations relatives à votre session (référent, page de renvoi, etc.).
        </li>
        <li>
          _shopify_visit, aucune donnée retenue, persiste pendant 30 minutes depuis la dernière
          visite. Utilisé par le système interne de suivi des statistiques du fournisseur de notre
          site web pour enregistrer le nombre de visites.
        </li>
        <li>
          _shopify_uniq, aucune donnée retenue, expire à minuit (selon l’emplacement du visiteur) le
          jour suivant. Calcule le nombre de visites d’une boutique par client unique.
        </li>
        <li>
          cart, identificateur unique, persiste pendant 2 semaines, stocke l’information relative à
          votre panier d’achat.
        </li>
        <li>_secure_session_id, identificateur unique de session</li>
        <li>
          storefront_digest, identificateur unique, indéfini si la boutique possède un mot de passe,
          il est utilisé pour savoir si le visiteur actuel a accès.
        </li>
      </ul>

      <p>
        Les « fichiers journaux » suivent l&apos;activité du Site et recueillent des données telles
        que votre adresse IP, le type de navigateur que vous utilisez, votre fournisseur
        d&apos;accès Internet, vos pages référentes et de sortie, et vos données d&apos;horodatage
        (date et heure).
      </p>

      <p>
        Les « pixels invisibles », les « balises » et les « pixels » sont des fichiers électroniques
        qui enregistrent des informations sur la façon dont vous parcourez le Site.
      </p>

      <p>
        [[INSÉRER LES DESCRIPTIONS DES AUTRES TYPES DE TECHNOLOGIES DE SUIVI QUE VOUS UTILISEZ]]
      </p>

      <p>
        Par ailleurs, lorsque vous effectuez ou tentez d&apos;effectuer un achat par le biais du
        Site, nous recueillons certaines informations vous concernant, notamment votre nom, votre
        adresse de facturation, votre adresse d&apos;expédition, vos informations de paiement (y
        compris vos numéros de cartes de crédit), votre adresse e-mail et votre numéro de téléphone.
        Ces informations collectées automatiquement sont désignées par l’appellation « Informations
        sur la commande ».
      </p>

      <p>
        Lorsque nous utilisons l&apos;expression « Informations personnelles » dans la présente
        Politique de confidentialité, nous faisons allusion à la fois aux Informations sur
        l&apos;appareil et aux Informations sur la commande.
      </p>

      <h2>COMMENT UTILISONS-NOUS VOS INFORMATIONS PERSONNELLES ?</h2>

      <p>
        En règle générale, nous utilisons les Informations sur la commande que nous recueillons pour
        traiter toute commande passée par le biais du Site (y compris pour traiter vos informations
        de paiement, organiser l&apos;expédition de votre commande et vous fournir des factures
        et/ou des confirmations de commande). En outre, nous utilisons ces Informations sur la
        commande pour :
      </p>

      <ul>
        <li>communiquer avec vous ;</li>
        <li>évaluer les fraudes ou risques potentiels ; et</li>
        <li>
          lorsque cela correspond aux préférences que vous nous avez communiquées, vous fournir des
          informations ou des publicités concernant nos produits ou services.
        </li>
      </ul>

      <p>
        Nous utilisons les Informations sur l&apos;appareil (en particulier votre adresse IP) que
        nous recueillons pour évaluer les fraudes ou risques potentiels et, de manière plus
        générale, pour améliorer et optimiser notre Site (par exemple, en générant des analyses sur
        la façon dont nos clients parcourent et interagissent avec le Site, et pour évaluer la
        réussite de nos campagnes de publicité et de marketing).
      </p>

      <h2>PARTAGE DE VOS INFORMATIONS PERSONNELLES</h2>

      <p>
        Nous partageons vos Informations personnelles avec des tiers qui nous aident à les utiliser
        aux fins décrites précédemment. Par exemple, nous utilisons Shopify pour héberger notre
        boutique en ligne – pour en savoir plus sur l&apos;utilisation de vos Informations
        personnelles par Shopify, veuillez consulter la page suivante :
        <a href="https://www.shopify.fr/legal/confidentialite">
          https://www.shopify.fr/legal/confidentialite
        </a>
        . Nous utilisons également Google Analytics pour mieux comprendre comment nos clients
        utilisent le Site – pour en savoir plus sur l&apos;utilisation de vos Informations
        personnelles par Google, veuillez consulter la page suivante :
        <a href="https://www.google.com/intl/fr/policies/privacy/">
          https://www.google.com/intl/fr/policies/privacy/
        </a>
        . Vous pouvez aussi désactiver Google Analytics ici :
        <a href="https://tools.google.com/dlpage/gaoptout">
          https://tools.google.com/dlpage/gaoptout
        </a>
        .
      </p>

      <p>
        Enfin, il se peut que nous partagions aussi vos Informations personnelles pour respecter les
        lois et règlementations applicables, répondre à une assignation, à un mandat de perquisition
        ou à toute autre demande légale de renseignements que nous recevons, ou pour protéger nos
        droits.
      </p>

      <h2>PUBLICITÉ COMPORTEMENTALE</h2>

      <p>
        Comme indiqué ci-dessus, nous utilisons vos Informations personnelles pour vous proposer des
        publicités ciblées ou des messages de marketing qui, selon nous, pourraient vous intéresser.
        Pour en savoir plus sur le fonctionnement de la publicité ciblée, vous pouvez consulter la
        page d&apos;information de la Network Advertising Initiative (NAI) à l&apos;adresse suivante
        :
        <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work">
          http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
        </a>
        .
      </p>

      <p>Vous pouvez refuser la publicité ciblée ici :</p>

      <h3>QUELQUES LIENS COURANTS :</h3>

      <ul>
        <li>
          FACEBOOK –
          <a href="https://www.facebook.com/settings/?tab=ads">
            https://www.facebook.com/settings/?tab=ads
          </a>
        </li>
        <li>
          GOOGLE –
          <a href="https://www.google.com/settings/ads/anonymous">
            https://www.google.com/settings/ads/anonymous
          </a>
        </li>
        <li>
          BING –
          <a href="https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees">
            https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees
          </a>
        </li>
      </ul>

      <p>
        En outre, vous pouvez refuser certains de ces services en vous rendant sur le portail de
        désactivation de Digital Advertising Alliance à l&apos;adresse suivante :
        <a href="https://optout.aboutads.info/?c=3&lang=fr">
          https://optout.aboutads.info/?c=3&lang=fr
        </a>
        .
      </p>

      <h2>NE PAS SUIVRE</h2>

      <p>
        Veuillez noter que nous ne modifions pas la collecte de données de notre Site et nos
        pratiques d&apos;utilisation lorsque nous détectons un signal « Ne pas suivre » sur votre
        navigateur.
      </p>

      <h2>VOS DROITS</h2>

      <p>
        Si vous êtes résident(e) européen(ne), vous disposez d&apos;un droit d&apos;accès aux
        informations personnelles que nous détenons à votre sujet et vous pouvez demander à ce
        qu&apos;elles soient corrigées, mises à jour ou supprimées. Si vous souhaitez exercer ce
        droit, veuillez nous contacter au moyen des coordonnées précisées ci-dessous.
      </p>

      <p>
        Par ailleurs, si vous êtes résident(e) européen(ne), notez que nous traitons vos
        informations dans le but de remplir nos obligations contractuelles à votre égard (par
        exemple si vous passez une commande sur le Site) ou de poursuivre nos intérêts commerciaux
        légitimes, énumérés ci-dessus. Veuillez également noter que vos informations seront
        transférées hors de l&apos;Europe, y compris au Canada et aux États-Unis.
      </p>

      <h2>RÉTENTION DES DONNÉES</h2>

      <p>
        Lorsque vous passez une commande par l&apos;intermédiaire du Site, nous conservons les
        Informations sur votre commande dans nos dossiers, sauf si et jusqu&apos;à ce que vous nous
        demandiez de les supprimer.
      </p>

      <h2>CHANGEMENTS</h2>

      <p>
        Nous pouvons être amenés à modifier la présente politique de confidentialité de temps à
        autre afin d&apos;y refléter, par exemple, les changements apportés à nos pratiques ou pour
        d&apos;autres motifs opérationnels, juridiques ou réglementaires.
      </p>

      <h2>NOUS CONTACTER</h2>

      <p>
        Pour en savoir plus sur nos pratiques de confidentialité, si vous avez des questions ou si
        vous souhaitez déposer une réclamation, veuillez nous contacter par e-mail à
        <a href="mailto:rigoulet.henri.pierre@gmail.com">rigoulet.henri.pierre@gmail.com</a>, ou par
        courrier à l&apos;adresse suivante :
      </p>

      <address>25 chemin du sanatorium, Besançon, 25000, France</address>
    </section>
  );
}
