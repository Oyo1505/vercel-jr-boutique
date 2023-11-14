import { Metadata } from 'next';
import { URL_CONDITIONS_GENERALES } from 'shared/constants/route';
import styles from './page.module.scss';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase : process.env.DOMAIN_URL ?  new URL(`https://${process.env.DOMAIN_URL}`) :  new URL('http://localhost:3000'),
    title: 'Conditions générales de vente',
    description: 'Conditions générales de vente | JR Distribution',
    verification: {
      google: 'google'
    },
    alternates: {
      canonical: URL_CONDITIONS_GENERALES
    }
  };
}

export default async function Page() {
  return (
    <section className={styles.container}>
      <h1>CONDITIONS D&apos;UTILISATION</h1>

      <p>
        Ce site web est exploité par JR Distribution. Partout sur le site, nous employons les termes
        « nous », « notre » et « nos » en référence à JR Distribution. Ce site web, y compris
        l&apos;ensemble des informations, outils et services auquel il donne accès, est offert par
        JR Distribution à l&apos;utilisateur que vous êtes, à condition que vous acceptiez la
        totalité des modalités, conditions, politiques et avis stipulés ici.
      </p>

      <p>
        En visitant notre site et/ou en achetant quelque chose auprès de notre entreprise, vous
        prenez part à notre « Service » et acceptez d&apos;être lié(e) par les modalités et
        conditions suivantes (« Conditions générales », « Conditions d&apos;utilisation »), y
        compris par les modalités, conditions et politiques mentionnées aux présentes et/ou
        accessibles en hyperlien. Les présentes Conditions d&apos;utilisation s&apos;appliquent à
        tous les utilisateurs du Site, y compris, sans s&apos;y limiter, aux individus qui sont des
        visiteurs, des fournisseurs, des clients, des marchands et/ou des fournisseurs de contenu.
      </p>

      <p>
        Veuillez lire attentivement les présentes Conditions d&apos;utilisation avant d&apos;accéder
        à notre site web et de l&apos;utiliser. En accédant à une quelconque partie du Site ou en
        l&apos;utilisant, vous acceptez d&apos;être lié(e) par les présentes Conditions
        d&apos;utilisation. Si vous n&apos;acceptez pas la totalité des modalités et conditions du
        présent accord, vous ne pourrez peut-être pas accéder au site web ou utiliser ses services.
        Si les présentes Conditions d&apos;utilisation sont considérées comme une offre, leur
        acceptation se limite expressément à elles.
      </p>

      <p>
        Chacun des nouveaux outils ou fonctionnalités qui sont ajoutés à la présente boutique est
        également assujetti aux Conditions d&apos;utilisation. Vous pouvez consulter la version la
        plus récente des Conditions d&apos;utilisation à tout moment sur cette page. Nous nous
        réservons le droit de mettre à jour, modifier ou remplacer n&apos;importe quelle partie des
        présentes Conditions d&apos;utilisation en publiant lesdites mises à jour et/ou
        modifications sur notre site web. Il vous incombe de vérifier cette page de temps à autre
        pour voir si des changements y ont été apportés. En continuant à accéder au site web ou à
        l&apos;utiliser après la publication des modifications, vous acceptez celles-ci.
      </p>

      <p>
        Notre boutique est hébergée sur Shopify Inc. Cette société nous fournit la plateforme
        e-commerce en ligne qui nous permet de vous vendre nos produits et services.
      </p>

      <h2>SECTION 1 – CONDITIONS D&apos;UTILISATION DE LA BOUTIQUE EN LIGNE</h2>

      <p>
        En acceptant les présentes Conditions d&apos;utilisation, vous déclarez avoir atteint ou
        dépassé l&apos;âge de la majorité dans votre région, province ou État et nous avoir donné
        l&apos;autorisation de permettre à toute personne mineure à votre charge d&apos;utiliser ce
        site.
      </p>

      <p>
        Vous ne devez en aucune façon utiliser nos produits à des fins illégales ou non autorisées,
        ni violer des lois de votre juridiction lorsque vous utilisez le Service (y compris, sans
        toutefois s&apos;y limiter, les lois relatives aux droits d&apos;auteur).
      </p>

      <p>
        Vous ne devez pas transmettre de vers informatique, de virus ou tout code de nature
        destructrice.
      </p>

      <p>
        Une infraction ou une violation de n&apos;importe laquelle des Conditions entraînera la
        résiliation immédiate de vos Services.
      </p>

      <h2>SECTION 2 – CONDITIONS GÉNÉRALES</h2>

      <p>
        Nous nous réservons le droit de refuser de servir quelqu&apos;un à tout moment et pour
        quelque raison que ce soit.
      </p>

      <p>
        Vous comprenez que votre contenu (à l&apos;exception des informations relatives à votre
        carte de crédit) peut être transféré sans chiffrement et que cela comprend (a) des
        transmissions sur plusieurs réseaux ; et (b) des changements effectués dans le but de se
        conformer et de s&apos;adapter aux exigences techniques de la connexion de réseaux ou
        d&apos;appareils. Les informations de votre carte de crédit sont toujours chiffrées lors de
        leur transfert sur les réseaux.
      </p>

      <p>
        Vous acceptez de ne pas reproduire, dupliquer, copier, vendre, revendre ou exploiter toute
        partie du Service, toute utilisation du Service ou tout accès au Service, ou encore tout
        contact sur le site web à travers lequel le Service est fourni, sans notre autorisation
        écrite expresse.
      </p>

      <p>
        Les titres utilisés dans le présent accord sont inclus à titre indicatif uniquement et ne
        limiteront ni n&apos;affecteront aucunement ces Conditions.
      </p>

      <h2>SECTION 3 – EXACTITUDE, EXHAUSTIVITÉ ET ACTUALITÉ DES INFORMATIONS</h2>

      <p>
        Nous ne saurions être tenus responsables si les informations proposées sur ce site sont
        inexactes, incomplètes ou caduques. Le contenu de ce site est fourni à titre
        d&apos;information générale uniquement et ne doit pas être considéré ou utilisé comme seule
        base pour la prise de décisions sans consulter des sources d&apos;information plus
        importantes, plus exactes, plus complètes ou plus actuelles. Si vous vous fiez au contenu de
        ce site, vous le faites à vos propres risques.
      </p>

      <p>
        Ce site peut contenir certaines données historiques. Par définition, les données historiques
        ne sont pas actuelles et sont fournies uniquement à titre de référence. Nous nous réservons
        le droit de modifier les contenus de ce site à tout moment, mais nous n&apos;avons aucune
        obligation de mettre à jour les informations qu&apos;il contient, quelles qu&apos;elles
        soient. Vous reconnaissez qu&apos;il vous incombe de surveiller les changements apportés à
        notre site.
      </p>

      <h2>SECTION 4 – MODIFICATIONS DU SERVICE ET DES PRIX</h2>

      <p>Les prix de nos produits sont modifiables sans préavis.</p>

      <p>
        Nous nous réservons le droit de modifier ou de mettre fin au Service (ou à une quelconque
        partie de celui-ci) à tout moment et sans préavis.
      </p>

      <p>
        Nous ne pourrons être tenus responsables envers vous ou envers un tiers pour toute
        modification, changement de prix, suspension ou interruption du Service.
      </p>

      <h2>SECTION 5 – PRODUITS OU SERVICES</h2>

      <p>
        Certains produits ou services peuvent être exclusivement disponibles en ligne sur notre site
        web. Ces produits ou services peuvent être en quantités limitées et font l&apos;objet de
        retours ou d&apos;échanges conformément à notre politique de retour uniquement.
      </p>

      <p>
        Nous avons fait de notre mieux pour afficher aussi clairement que possible les couleurs et
        images de nos produits qui apparaissent sur le magasin. Nous ne pouvons pas garantir que
        l&apos;affichage de votre moniteur d&apos;ordinateur sera précis.
      </p>

      <p>
        Nous nous réservons le droit, mais ne sommes pas obligés, de limiter les ventes de nos
        produits ou services à toute personne, région géographique ou juridiction. Nous pourrions
        exercer ce droit au cas par cas. Nous nous réservons le droit de limiter les quantités de
        tout produit ou service que nous offrons. Toutes les descriptions de produits ou tous les
        prix des produits sont sujets à changement en tout temps sans préavis, à la seule discrétion
        de nous-mêmes. Nous nous réservons le droit d&apos;arrêter d&apos;offrir un produit à tout
        moment. Toute offre de service ou de produit présentée sur ce site est nulle là où la loi
        l&apos;interdit.
      </p>

      <p>
        Nous ne garantissons pas que la qualité de tous les produits, services, informations ou
        autres matériels que vous avez obtenus ou achetés répondra à vos attentes, ni que toute
        erreur dans le Service sera corrigée.
      </p>

      <h2>SECTION 6 – OUTILS EN OPTION</h2>

      <p>
        Nous pourrions vous fournir l&apos;accès à des outils de tierces parties sur lesquels nous
        n&apos;exerçons ni contrôle, ni surveillance, ni influence.
      </p>

      <p>
        Vous reconnaissez et acceptez que nous fournissons l&apos;accès à de tels outils « tels
        quels » et « tels que disponibles » sans aucune garantie, représentation ou condition
        d&apos;aucune sorte et sans aucune approbation. Nous n&apos;aurons aucune responsabilité
        découlant ou liée à votre utilisation d&apos;outils fournis par des tiers.
      </p>

      <p>
        Toute utilisation que vous faites des outils proposés par le site est entièrement à vos
        risques et périls, et vous devriez vous assurer que vous êtes familiarisé(e) avec les
        conditions auxquelles les outils sont fournis par le ou les fournisseurs tiers concernés.
      </p>

      <p>
        Nous pourrions également, à l&apos;avenir, offrir de nouveaux services et/ou fonctionnalités
        via le site web (y compris le lancement de nouveaux outils et ressources). Ces nouvelles
        fonctionnalités et/ou services seront également assujettis aux présentes Conditions
        d&apos;utilisation.
      </p>

      <h2>SECTION 7 – LIENS DE TIERS</h2>

      <p>
        Certains contenus, produits et services disponibles via notre Service pourraient inclure des
        éléments provenant de tierces parties.
      </p>

      <p>
        Les liens de tierces parties sur ce site peuvent vous rediriger vers des sites web de
        tierces parties qui ne sont pas affiliés à nous. Nous ne sommes pas tenus d&apos;examiner ou
        d&apos;évaluer le contenu ou l&apos;exactitude de ces sites, et nous ne garantissons pas et
        n&apos;assumons aucune responsabilité quant à tout contenu, site web, produit, service ou
        autre élément accessible via un lien de tierces parties.
      </p>

      <p>
        Nous ne sommes pas responsables des préjudices ou dommages liés à l&apos;achat ou à
        l&apos;utilisation de biens, de services, de ressources, de contenu ou de toute autre
        transaction effectuée en rapport avec ces sites web de tierces parties. Veuillez examiner
        attentivement les politiques et pratiques de tierces parties et assurez-vous de les
        comprendre avant de vous engager dans une transaction. Les plaintes, réclamations,
        préoccupations ou questions concernant les produits de tierces parties doivent être
        adressées à la tierce partie.
      </p>

      <h2>SECTION 8 – COMMENTAIRES UTILISATEURS, RÉTROACTIONS ET AUTRES ENVOIS</h2>

      <p>
        Si, à notre demande, vous envoyez certaines communications spécifiques (ou sans demande de
        notre part), ou si vous envoyez des idées créatives, des suggestions, des propositions, des
        plans ou d&apos;autres matériels, que ce soit en ligne, par courrier, ou autrement
        (collectivement, « commentaires »), vous nous autorisez à tout moment, sans restriction, à
        éditer, copier, publier, distribuer, traduire et autrement utiliser dans tout média tout
        commentaire que vous nous envoyez. Nous ne sommes pas et ne devrons pas être tenus (1) de
        maintenir la confidentialité des commentaires, (2) de payer une indemnité à quiconque pour
        tout commentaire fourni, ou (3) de répondre à tout commentaire.
      </p>

      <p>
        Nous pourrions, mais n&apos;avons aucune obligation de le faire, surveiller, éditer ou
        supprimer le contenu que nous estimons, à notre seule discrétion, être illégal, offensant,
        menaçant, injurieux, diffamatoire, pornographique, obscène ou autrement répréhensible, ou
        qui enfreint la propriété intellectuelle d&apos;une partie ou ces Conditions
        d&apos;utilisation.
      </p>

      <p>
        Vous convenez que vos commentaires ne violeront pas les droits de tierces parties, y compris
        les droits d&apos;auteur, de marque, de confidentialité, de personnalité ou d&apos;autres
        droits personnels ou de propriété. Vous convenez également que vos commentaires ne
        contiendront pas de contenu diffamatoire ou illégal, abusif ou obscène, ni ne contiendront
        de virus informatique ou d&apos;autres logiciels malveillants qui pourraient affecter de
        quelque manière que ce soit le fonctionnement du Service ou tout autre site web associé.
        Vous ne pouvez pas utiliser de fausse adresse e-mail, prétendre être quelqu&apos;un que vous
        n&apos;êtes pas, ou induire en erreur quant à l&apos;origine de tout commentaire. Vous êtes
        seul responsable des commentaires que vous faites et de leur exactitude. Nous
        n&apos;assumons aucune responsabilité et déclinons tout engagement quant à tout commentaire
        que vous postez ou que vous envoyez par toute autre voie que ce soit.
      </p>

      <h2>SECTION 9 – INFORMATIONS PERSONNELLES</h2>

      <p>
        Votre soumission d&apos;informations personnelles via le magasin est régie par notre
        Politique de confidentialité. Pour consulter notre Politique de confidentialité.
      </p>

      <h2>SECTION 10 – ERREURS, INEXACTITUDES ET OMISSIONS</h2>

      <p>
        Il peut arriver que certaines informations sur notre site ou dans le Service soient
        inexactes, incomplètes ou obsolètes. Nous nous réservons le droit de corriger toute erreur,
        inexactitude ou omission, et de changer ou mettre à jour des informations à tout moment sans
        préavis.
      </p>

      <p>
        Il ne faut pas prendre des informations du Service ou du site web comme étant à jour, sauf
        si elles datent d&apos;une date ultérieure.
      </p>

      <h2>SECTION 11 – UTILISATIONS INTERDITES</h2>

      <p>
        En plus des interdictions énoncées dans les Conditions d&apos;utilisation, il vous est
        interdit d&apos;utiliser le site ou son contenu : (a) à des fins illégales ; (b) pour
        inciter des tiers à réaliser des actes illégaux ou à y participer ; (c) pour enfreindre
        toute ordonnance régionale ou toute loi, règle ou régulation internationale, fédérale,
        provinciale ou étatique ; (d) pour porter atteinte à ou violer nos droits de propriété
        intellectuelle ou ceux de tierces parties ; (e) pour harceler, maltraiter, diffamer,
        calomnier, dénigrer, intimider ou discriminer quiconque en fonction du sexe, de
        l&apos;orientation sexuelle, de la religion, de l&apos;origine ethnique, de la race, de
        l&apos;âge, de l&apos;origine nationale ou de la personne handicapée ; (f) pour soumettre
        des renseignements faux ou trompeurs ; (g) pour télécharger ou transmettre des virus ou tout
        autre type de code malveillant qui sera ou pourrait être utilisé de manière à compromettre
        la fonctionnalité ou le fonctionnement du Service ou de tout autre site web associé,
        indépendant, ou d&apos;Internet ; (h) pour recueillir ou suivre les renseignements
        personnels d&apos;autrui ; (i) pour polluposter, hameçonner, détourner un domaine, extorquer
        des informations, parcourir, explorer ou balayer le web (ou toute autre ressource) ; (j) à
        des fins obscènes ou immorales ; ou (k) pour porter atteinte ou contourner les mesures de
        sécurité de notre Service, de tout autre site web, ou d&apos;Internet. Nous nous réservons
        le droit de résilier votre utilisation du Service ou de tout site web connexe pour avoir
        enfreint les utilisations interdites.
      </p>

      <h2>SECTION 12 – EXCLUSION DE GARANTIES ET LIMITATION DE RESPONSABILITÉ</h2>

      <p>
        Nous ne garantissons pas, ne représentons pas et n&apos;assurons aucune réparation que votre
        utilisation de notre Service sera ininterrompue, rapide, sécurisée ou sans erreur.
      </p>

      <p>
        Nous ne garantissons pas que les résultats qui pourraient être obtenus par
        l&apos;utilisation du Service seront exacts ou fiables.
      </p>

      <p>
        Vous convenez que de temps à autre, nous pouvons supprimer le Service pour des périodes de
        temps indéfinies ou annuler le Service à tout moment, sans vous avertir au préalable.
      </p>

      <p>
        Vous convenez expressément que votre utilisation du Service, ou votre incapacité à utiliser
        le Service, est à votre seul risque. Le Service et tous les produits et services qui vous
        sont fournis par le biais du Service sont (sauf mention expresse de notre part) fournis «
        tels quels » et « tels que disponibles » pour votre utilisation, sans représentation,
        garanties ou conditions d&apos;aucune sorte, expresses ou implicites, y compris toutes les
        garanties implicites de qualité marchande, d&apos;aptitude à un usage particulier, de
        durabilité, de titre et d&apos;absence de contrefaçon.
      </p>

      <p>
        En aucun cas, JR Distribution, nos directeurs, dirigeants, employés, sociétés affiliées,
        agents, contractants, stagiaires, fournisseurs, prestataires de services ou concédants ne
        pourront être tenus responsables de blessures, de pertes, de réclamations, ou de tout
        dommage direct, indirect, accessoire, punitif, spécial ou consécutif de quelque nature que
        ce soit, y compris, sans limitation, les pertes de profits, les pertes de revenus, les
        pertes d&apos;économies, les pertes de données, les coûts de remplacement, ou tout autre
        dommage similaire, qu&apos;ils soient contractuels, délictuels (y compris la négligence), la
        responsabilité stricte ou autre, résultant de votre utilisation de tout service ou produit
        provenant de ce Service, ou quant à toute autre réclamation liée de quelque manière que ce
        soit à votre utilisation du Service ou de tout produit, y compris, mais sans s&apos;y
        limiter, à tout défaut ou omission dans tout contenu, ou à toute perte ou tout dommage de
        quelque nature que ce soit résultant de l&apos;utilisation du Service ou de tout contenu (ou
        produit) affiché, transmis, ou autrement mis à disposition par le Service, même si vous avez
        été informé(e) de la possibilité de tels dommages. Parce que certains états ou certaines
        juridictions n&apos;autorisent pas l&apos;exclusion ou la limitation de responsabilité pour
        les dommages indirects ou accessoires, dans ces états ou juridictions, notre responsabilité
        sera limitée dans la mesure maximale permise par la loi.
      </p>

      <h2>SECTION 13 – INDEMNISATION</h2>

      <p>
        Vous acceptez d&apos;indemniser, de défendre et de dégager de toute responsabilité JR
        Distribution et notre société mère, filiales, sociétés affiliées, partenaires, dirigeants,
        directeurs, agents, contractants, concédants, prestataires de services, sous-traitants,
        fournisseurs, stagiaires et employés, quant à toute réclamation ou demande, y compris les
        honoraires d&apos;avocat raisonnables, faite par un tiers en raison ou découlant de votre
        violation des présentes Conditions d&apos;utilisation ou des documents auxquels elles font
        référence, ou de votre violation de toute loi ou des droits d&apos;un tiers.
      </p>

      <h2>SECTION 14 – DISSOCIABILITÉ</h2>

      <p>
        Dans le cas où une disposition des présentes Conditions d&apos;utilisation serait jugée
        comme étant illégale, nulle ou inapplicable, cette disposition pourra néanmoins être
        appliquée dans toute la mesure permise par la loi applicable, et la partie non applicable
        sera réputée être dissociée des présentes Conditions d&apos;utilisation, cette dissociation
        n&apos;affectant pas la validité et l&apos;applicabilité de toutes les autres dispositions
        restantes.
      </p>

      <h2>SECTION 15 – RÉSILIATION</h2>

      <p>
        Les obligations et responsabilités des parties engagées avant la date de résiliation
        survivront à la résiliation de cet accord à toutes les fins.
      </p>

      <p>
        Les présentes Conditions d&apos;utilisation sont en vigueur à moins et jusqu&apos;à leur
        résiliation par vous ou par nous. Vous pouvez résilier les présentes Conditions
        d&apos;utilisation à tout moment en nous avisant que vous ne souhaitez plus utiliser nos
        Services, ou lorsque vous cessez d&apos;utiliser notre site.
      </p>

      <p>
        Si, à notre seule discrétion, vous ne respectez pas, ou si nous soupçonnons que vous
        n&apos;avez pas respecté, toute modalité ou disposition des présentes Conditions
        d&apos;utilisation, nous pouvons également résilier le présent accord à tout moment sans
        préavis, et vous demeurerez responsable de toutes les sommes dues jusqu&apos;à la date de
        résiliation (y compris la date de résiliation), et/ou nous pourrions vous refuser
        l&apos;accès à nos Services (ou à toute partie de ceux-ci).
      </p>

      <h2>SECTION 16 – INTÉGRALITÉ DE L&apos;ACCORD</h2>

      <p>
        Le fait que nous n&apos;exercions pas ou n&apos;appliquions pas un droit ou une disposition
        des présentes Conditions d&apos;utilisation ne constitue pas une renonciation à ce droit ou
        à cette disposition.
      </p>

      <p>
        Les présentes Conditions d&apos;utilisation ou toute autre politique ou règle
        d&apos;exploitation que nous publions sur ce site ou relativement au Service constituent
        l&apos;intégralité de l&apos;accord et de l&apos;entente entre vous et nous et régissent
        votre utilisation du Service, remplaçant toutes les communications antérieures ou
        contemporaines, qu&apos;elles soient orales ou écrites, entre vous et nous (y compris, mais
        sans s&apos;y limiter, les versions antérieures des Conditions d&apos;utilisation).
      </p>

      <p>
        Toute ambiguïté quant à l&apos;interprétation des présentes Conditions d&apos;utilisation ne
        doit pas être interprétée en défaveur de la partie rédactrice.
      </p>

      <h2>SECTION 17 – LOI APPLICABLE</h2>

      <p>
        Les présentes Conditions d&apos;utilisation et tout accord distinct par le biais duquel nous
        vous fournissons des Services seront régis et interprétés conformément aux lois en vigueur
        en France.
      </p>

      <h2>SECTION 18 – MODIFICATIONS DES CONDITIONS D&apos;UTILISATION</h2>

      <p>
        Vous pouvez consulter la version la plus récente des Conditions d&apos;utilisation à tout
        moment sur cette page.
      </p>

      <p>
        Nous nous réservons le droit, à notre seule discrétion, de mettre à jour, de modifier ou de
        remplacer toute partie des présentes Conditions d&apos;utilisation en publiant les mises à
        jour et les changements sur notre site web. Il vous incombe de visiter notre site web
        régulièrement pour vérifier si des changements ont été apportés. Votre utilisation continue
        de ou votre accès à notre site web après la publication de toute modification des présentes
        Conditions d&apos;utilisation constitue une acceptation de ces modifications.
      </p>

      <h2>SECTION 19 – COORDONNÉES</h2>

      <p>
        Les questions concernant les Conditions d&apos;utilisation doivent nous être envoyées à
        l&apos;adresse e-mail suivante :
        <a href="mailto:contact-jr@contac-jrboutique.fr">contact-jr@contac-jrboutique.fr</a>
      </p>
    </section>
  );
}
