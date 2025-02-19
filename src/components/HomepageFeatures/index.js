import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Structured Data',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        정형화된 데이터를 손쉽게 처리하고 분석할 수 있습니다. 
        Amazon Bedrock을 통해 데이터베이스, 스프레드시트, CSV 등 
        구조화된 데이터를 효율적으로 활용해보세요.
      </>
    ),
  },
  {
    title: 'Unstructured Data',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        이미지, 텍스트, 음성 등 비정형 데이터도 쉽게 처리할 수 있습니다. 
        강력한 AI 모델들을 활용하여 다양한 형태의 데이터에서 
        인사이트를 도출해보세요.
        </>
    ),
  },
  {
    title: 'Powered by AWS',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        AWS의 안정적인 인프라와 보안을 기반으로 서비스를 구축하세요.
        확장 가능하고 안전한 환경에서 AI 워크로드를 실행할 수 있습니다.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
