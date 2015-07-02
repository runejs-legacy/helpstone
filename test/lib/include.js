import { include } from '../../lib';

describe('include', () => {
  it('includes instance methods', () => {
    class ClassA {
      method() {
        return 5;
      }
    }

    @include(ClassA)
    class ClassB {

    }

    expect(new ClassB().method()).to.eq(5);
  });

  it('includes static methods', () => {
    class ClassA {
      static method() {
        return 10;
      }
    }

    @include(ClassA)
    class ClassB {

    }

    expect(ClassB.method()).to.eq(10);
  });

  it('it can be extended', () => {
    class ClassA {
      method() {
        return this.$super.method() + '-test';
      }

      static method() {
        return this.$super.method() + '-static';
      }
    }

    class ClassB {
      method() {
        return this.$super.method() + 15;
      }

      static method() {
        return this.$super.method() + 20;
      }
    }

    class ClassC {
      method() {
        return this.$super.method() + 10;
      }

      static method() {
        return this.$super.method() + 25;
      }
    }

    class BaseClass {
      method() {
        return this.method2();
      }
    }

    @include(ClassA)
    @include(ClassB)
    @include(ClassC)
    class ClassD extends BaseClass {
      method() {
        return super.method() + 5;
      }

      method2() {
        return 5;
      }

      static method() {
        return this.method2();
      }

      static method2() {
        return 30;
      }
    }

    expect(new ClassD().method()).to.eq('35-test');
    expect(ClassD.method()).to.eq('75-static');
  });

  it('calls included method', () => {
    class ClassA {
      static $included() {
        this.$$included = true;
      }
    }

    @include(ClassA)
    class ClassB {

    }

    expect(ClassB.$$included).to.be.true;
  });
});