import 'reflect-metadata'

function Test(target: Function) {
  Reflect.defineMetadata('c', 1, target)
  const meta = Reflect.getMetadata('c', target)
}

@Test
class C {

}