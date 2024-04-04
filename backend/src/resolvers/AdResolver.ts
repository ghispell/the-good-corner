import { Ad, AdUpdateInput, NewAdInput } from "../entities/ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({ relations: ["category"] });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number): Promise<Ad | null> {
    return await Ad.findOneBy({ id: id });
  }

  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: NewAdInput) {
    const resultFromSave = await Ad.save({ ...newAdData });
    const resultForApi = await Ad.find({
      relations: { category: true },
      where: { id: resultFromSave.id },
    });
    return resultForApi[0];
  }

  @Mutation(() => Ad)
  async deleteAd(@Arg("id") id: number): Promise<Ad | null> {
    const ad = await Ad.findOneBy({ id: id });

    if (!ad) {
      throw new Error("Ad not found");
    }

    await Ad.delete(id);

    return ad;
  }

  @Mutation(() => Ad)
  async editAdPut(
    @Arg("id") id: number,
    @Arg("data") bodyRequest: AdUpdateInput
  ): Promise<Ad | null> {
    try {
      await Ad.update({ id: id }, bodyRequest);
      return await Ad.findOneBy({ id: id });
    } catch (err) {
      return err;
    }
  }
}

export default AdResolver;
